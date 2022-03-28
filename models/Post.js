const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },
        caption: {
            type: DataTypes.STRING(140),
            allowNull: false,
        },
        post_content: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    }, {
        hooks: {
            // Create caption from post_content if no caption proviided
            async beforeCreate(newPostData) {
                if (!newPostData.caption) {
                    let generatedCaption = newPostData.post_content.substring(0, 136);
                    newPostData.caption = generatedCaption.concat(" ...");
                    return newPostData;
                }
                // if caption provided, then return without changes.
                return newPostData;
            },
            // Create caption from post_content if no caption proviided
            async beforeUpdate(updatedPostData) {
                if (!updatedPostData.caption) {
                    let generatedCaption = updatedPostData.post_content.substring(0, 136);
                    updatedPostData.caption = generatedCaption.concat(" ...");
                    return updatedPostData;
                }
                // if caption provided, then return without changes.
                return updatedPostData
            }
        },
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }

)

module.exports = Post;