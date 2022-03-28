const {
    Post
} = require('../models');

const postData = [{
        title: "Google pivots to being only a search engine again.",
        post_url: "https://www.google.com",
        caption: "Google finally gave up its global domination scheme",
        post_content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu lorem tincidunt, dictum nulla eget, dignissim dolor. Duis malesuada faucibus neque, non accumsan felis mattis sollicitudin. Vestibulum convallis interdum tortor, sed ultrices mi tincidunt eget. Sed auctor lobortis ex, a condimentum justo mattis non. Integer venenatis, arcu non feugiat volutpat, odio libero placerat diam, sodales vehicula purus erat ac ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla id varius orci. Nullam tristique tortor in risus aliquam efficitur. Sed vestibulum lectus a urna condimentum, eu rutrum sem mollis. Mauris sed dui in arcu faucibus volutpat. Integer tempus nisl ac mi vestibulum dignissim.",
        user_id: "1"
    },
    {
        title: "New Samsung phone will reportedly have no display, only camera.",
        post_url: "https://www.samsung.com",
        caption: "Samsung goes all in on sensors",
        post_content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu lorem tincidunt, dictum nulla eget, dignissim dolor. Duis malesuada faucibus neque, non accumsan felis mattis sollicitudin. Vestibulum convallis interdum tortor, sed ultrices mi tincidunt eget. Sed auctor lobortis ex, a condimentum justo mattis non. Integer venenatis, arcu non feugiat volutpat, odio libero placerat diam, sodales vehicula purus erat ac ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla id varius orci. Nullam tristique tortor in risus aliquam efficitur. Sed vestibulum lectus a urna condimentum, eu rutrum sem mollis. Mauris sed dui in arcu faucibus volutpat. Integer tempus nisl ac mi vestibulum dignissim.",
        user_id: "2"
    },
    {
        title: "Games journalist calls it quits after inheritiing millions from father.",
        post_url: "https://www.twitter.com",
        caption: "Dad isn't dead, might as well work in games.",
        post_content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu lorem tincidunt, dictum nulla eget, dignissim dolor. Duis malesuada faucibus neque, non accumsan felis mattis sollicitudin. Vestibulum convallis interdum tortor, sed ultrices mi tincidunt eget. Sed auctor lobortis ex, a condimentum justo mattis non. Integer venenatis, arcu non feugiat volutpat, odio libero placerat diam, sodales vehicula purus erat ac ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla id varius orci. Nullam tristique tortor in risus aliquam efficitur. Sed vestibulum lectus a urna condimentum, eu rutrum sem mollis. Mauris sed dui in arcu faucibus volutpat. Integer tempus nisl ac mi vestibulum dignissim.",
        user_id: "1"
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;