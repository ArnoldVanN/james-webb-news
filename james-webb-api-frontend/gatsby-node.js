const { createRemoteFileNode } = require("gatsby-source-filesystem");

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Customizing node created by gatsby-source-apiserver plugin
  // type name is what's defined in plugin config (typePrefix+name) in gatsby-config.ts. It's not what's displayed in GraphQL browser IDE.
  createTypes(`
    type internal__articles implements Node {
      thumbnailLocalFile: File @link(from: "fields.localThumbnailFile")
    }
  `)
}

exports.onCreateNode = async ({
  node,
  actions: { createNode, createNodeField },
  createNodeId,
  getCache,
}) => {
  if ("InternalArticles" && node.thumbnail) {
    const fileNode = await createRemoteFileNode({
      url: node.thumbnail, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      getCache,
    });

    if (fileNode) {
      console.log("Created file node with ID:", fileNode.id);
      createNodeField({ node, name: "localThumbnailFile", value: fileNode.id });
      createNode()
    }
  }
};