const { User } = require('../models')

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({});
        },
        user: async (parent, { id }, context) => {
            return await User.findById(id);
        }

    },
    Mutation: {
        // NEED TO ADD signToken LATER, AS CONTEXT
        createUser: async (parent, { username, email, password }, context) => {
            return await User.create({ username, email, password });
        },
        saveBook: async (parent, { id, savedBooks }) => {
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: id },
                    { $addToSet: { savedBooks: savedBooks } },
                    { new: true }
                );
                return updatedUser;
            } catch (error) {
                console.error(error);
                throw new Error('Unable to save book.');
            }
        },
        deleteBook: async (parent, { id, bookId }) => {
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                );
                return updatedUser;
            } catch (error) {
                console.error(error);
                throw new Error('Unable to delete book.');
            };
        },
    },
};

module.exports = resolvers;