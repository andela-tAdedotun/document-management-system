const User = require('../models/').User;
const Document = require('../models/').Document;

module.exports = {
  /**
  * @desc - Search the database for users
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Array} - Search results
  */
  searchUsers(req, res) {
    const searchQuery = req.query.search;
    const searchOptions = {
      where: {
        $or: [
          {
            name: {
              $iLike: `%${searchQuery}%`,
            }
          },
          {
            email: {
              $iLike: `%${searchQuery}%`,
            }
          }
        ]
      }
    };

    return User.findAll(searchOptions)
      .then(userMatches => res.status(200).send(userMatches))
      .catch(error => res.send(error));
  },

  /**
  * @desc - Search the database for documents
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Array} - Search results
  */
  searchDocuments(req, res) {
    const searchQuery = req.query.search;
    const searchOptions = {
      where: {
        $or: [
          {
            title: {
              $iLike: `%${searchQuery}%`,
            }
          },
          {
            content: {
              $iLike: `%${searchQuery}%`,
            }
          }
        ]
      }
    };

    Document.findAll(searchOptions)
      .then(documentMatches => res.status(200).send(documentMatches))
      .catch(error => res.send(error));
  }
};
