const path = require('path')
const _ = require('lodash')
const fastExif = require('fast-exif');
const xmpReader = require('xmp-reader');
const get = require('lodash/get');
const iptcReader = require('node-iptc');
const fs = require('fs');

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors
    }
    return result
  })

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  let slug
  // Search for MDX filenodes
  if (node.internal.type === 'Mdx') {
    // If the frontmatter has a "slug", use it
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.slug)}`
    }
    // If not derive a slug from the "title" in the frontmatter
    else if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`
    }
    createNodeField({ node, name: 'slug', value: slug })
  }

  if(node.extension === 'jpg') {
    const absolutePath = node.absolutePath;
    fastExif.read(absolutePath)
      .then((exifData) => {
        const title        = get( exifData, [ 'image', 'ImageDescription' ], null );
        const location     = get( exifData, [ 'image', 'DocumentName' ], null );

        createNodeField({
          node,
          name: 'exif',
          value: { title, location }
        });
      })
      .catch((err) => console.error(err));
    /*
    fs.readFile(absolutePath, function(err, data) {
      if (err) { throw err }
      let iptc = iptcReader(data);
      let xmp =   xmpReader.fromBuffer(data);
      console.log(iptc);
      console.log(xmp);
    });
    */
  }

}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const projectTemplate = require.resolve('./src/templates/project.js')
  const projectResult = await wrapper(
    graphql(`
      {
        projects: allMdx(sort: { fields: [frontmatter___date], order: DESC }, filter: {fileAbsolutePath: {regex: "/content/projects/"}}) {
          nodes {
            fileAbsolutePath
            fields {
              slug
            }
            frontmatter {
              title,
              cover {
                absolutePath
              }
            }
          }
        }
      }
    `)
  )

  const projectPosts = projectResult.data.projects.nodes

  projectPosts.forEach((n, index) => {
    createPage({
      path: n.fields.slug,
      component: projectTemplate,
      context: {
        slug: n.fields.slug,
        // Pass the current directory of the project as regex in context so that the GraphQL query can filter by it
        absolutePathRegex: `/^${path.dirname(n.fileAbsolutePath)}/`,
      },
    })
  })

  const pageTemplate = path.resolve(`src/templates/page.js`)
  const pageResult = await graphql(`
    {
      pages: allMdx(filter: {fileAbsolutePath: {regex: "/content/pages/"}}) {
        nodes {
          fileAbsolutePath
          fields {
            slug
          }
          frontmatter {
            title
          }
          body
        }
      }
    }
  `)

  const pages = pageResult.data.pages.nodes

  pages.forEach((n) => {
    createPage({
      path: n.fields.slug,
      component: pageTemplate,
      context: {
        title: n.frontmatter.title,
        body: n.body,
      },
    })
  })
}
