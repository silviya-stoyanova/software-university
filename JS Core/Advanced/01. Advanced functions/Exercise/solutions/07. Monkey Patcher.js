function solve() {  // only the function lays here
    let post = {
        id: '3',
        author: 'emil',
        content: 'wazaaaaa',
        upvotes: 100,
        downvotes: 100
    };

    // ONLY THIS:
    function solution(command) {
        if (command === 'upvote') {
            return post.upvotes++

        } else if (command === 'downvote') {
            return post.downvotes++

        } else if (command === 'score') {
            let reportVotes = []
            let positiveVotes = post.upvotes
            let negativeVotes = post.downvotes
            let totalVotes = positiveVotes - negativeVotes

            if (positiveVotes >= 50 || positiveVotes >= 50) { //?? or totalVotes
                if (positiveVotes >= negativeVotes) {
                    negativeVotes += Math.ceil(positiveVotes * 0.25)
                    positiveVotes += Math.ceil(positiveVotes * 0.25)

                } else {
                    positiveVotes += Math.ceil(negativeVotes * 0.25)
                    negativeVotes += Math.ceil(negativeVotes * 0.25)
                }

                totalVotes = positiveVotes - negativeVotes
            }
            // If the post has less than 10 total votes,
            // or no other rating is met,           - meaning?? nothing.
            // it’s rating is new regardless of balance.

            let rating = 'rate'

            // negative = 20, positive = 40
            // 40 / (20+40) = 0.666666 * 100 = 66,6666%

            let positiveVotesMajority = post.upvotes / (post.upvotes + post.downvotes) * 100 > 66
            let negativeVotesMajority = post.downvotes / (post.upvotes + post.downvotes) * 100 > 66

            // if (totalVotes < 10) {
            //     rating = 'new'
            //
            // } else
            if (positiveVotesMajority) {
                rating = 'hot'

            } else if (!positiveVotesMajority && !negativeVotesMajority && (post.upvotes > 100 || post.downvotes > 100)) {
                rating = 'controversial'

            } else if (negativeVotes) {
                rating = 'unpopular'

            } else {
                rating = 'new'
            }

            reportVotes.push(positiveVotes, negativeVotes, totalVotes, rating)
            console.log(reportVotes)
            return reportVotes
        }

    }
    // END.


    solution.call(post, 'upvote');
    solution.call(post, 'downvote');
    let score = solution.call(post, 'score'); // [127, 127, 0, 'controversial']

    for (let i = 0; i < 50; i++) {
        solution.call(post, 'downvote');// (executed 50 times)
    }

    score = solution.call(post, 'score');     // [139, 189, -50, 'unpopular']
    console.log(post);
}
solve()

