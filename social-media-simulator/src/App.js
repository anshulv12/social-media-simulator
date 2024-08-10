import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [page, setPage] = useState('profile');
  const [tweets, setTweets] = useState({});
  const [showTweetPopup, setShowTweetPopup] = useState(false);
  const [newTweetText, setNewTweetText] = useState('');
  const [showRepliesPopup, setShowRepliesPopup] = useState(false);
  const [selectedTweet, setSelectedTweet] = useState(null);

  const replies = [
    { name: 'Elon Musk', username: 'elonmusk', profilePic: 'elon.jpg' },
    { name: 'LeBron James', username: 'KingJames', profilePic: 'lebron.jpg' },
    { name: 'MrBeast', username: 'MrBeast', profilePic: 'mrbeast.png' },
  ];

  const confusedReplies = [
    'HACKED!? There is no way the former President of the United States just tweeted this LMFAOO',
    'obviously hacked but I agree',
    "dont care kamala clears ratio + L",
    'Heard that for 4 years already',
    'what intern is running this account',
  ];

  const showHomeTweet = () => {
    const cnnTweet = {
      name: 'CNN Breaking News',
      username: 'CNN',
      profilePic: 'cnn.png',
      content: 'BREAKING NEWS: Donald Trump tweeted "I HATE MEXICO!" CNN Reports',
      timestamp: Date.now(),
      likes: Math.floor(Math.random() * 1000),
      retweets: Math.floor(Math.random() * 500),
      repliesCount: Math.floor(Math.random() * 50),
    };
    return (
      <div className="tweet" key={cnnTweet.timestamp}>
        <img src={cnnTweet.profilePic} alt="Profile Image" />
        <div className="tweet-content">
          <div className="tweet-header">
            <strong>{cnnTweet.name}</strong> <span className="tweet-username">@{cnnTweet.username}</span>
            <span className="tweet-date">{new Date(cnnTweet.timestamp).toLocaleDateString()}</span>
          </div>
          <div>{cnnTweet.content}</div>
          <div className="actions">
            <button>{cnnTweet.likes || 0}</button>
            <button>{cnnTweet.retweets || 0}</button>
            <button>{cnnTweet.repliesCount || 0}</button>
            <button>Share</button>
            <button>Analytics</button>
            <button>Bookmark</button>
          </div>
        </div>
      </div>
    );
  };

  const showTab = (tab) => {
    if (tab === 'tweets') {
      const sortedTweets = Object.values(tweets).sort((a, b) => b.timestamp - a.timestamp);
      return sortedTweets.map((tweet) => (
        <div className="tweet" key={tweet.id} onClick={() => openRepliesPopup(tweet.id)}>
          <img src={tweet.profilePic} alt="Profile Image" />
          <div className="tweet-content">
            <div className="tweet-header">
              <strong>{tweet.name}</strong> <span className="tweet-username">@{tweet.username}</span>
              <span className="tweet-date">{new Date(tweet.timestamp).toLocaleDateString()}</span>
              {tweet.username === 'realDonaldTrump' ? (
                <img src="verified.png" alt="Verified Checkmark" style={{ width: '16px', height: '16px', marginLeft: '5px' }} />
              ) : null}
            </div>
            <div>{tweet.content}</div>
            <div className="actions">
              <button>{tweet.likes || 0}</button>
              <button>{tweet.retweets || 0}</button>
              <button>{tweet.repliesCount || 0}</button>
              <button>Share</button>
              <button>Analytics</button>
              <button>Bookmark</button>
            </div>
          </div>
        </div>
      ));
    }
  };

  const postNewTweet = () => {
    if (newTweetText) {
      const tweetId = Date.now();
      setTweets({
        ...tweets,
        [tweetId]: {
          id: tweetId,
          name: 'Donald J. Trump',
          username: 'realDonaldTrump',
          profilePic: 'pfp.jpg',
          content: newTweetText,
          timestamp: Date.now(),
          likes: Math.floor(Math.random() * 1000),
          retweets: Math.floor(Math.random() * 500),
          repliesCount: Math.floor(Math.random() * 50),
          replies: getRandomReplies(),
        },
      });
      setNewTweetText('');
      setShowTweetPopup(false);
    }
  };

  const getRandomReplies = () => {
    return replies.map((reply) => ({
      ...reply,
      content: confusedReplies[Math.floor(Math.random() * confusedReplies.length)],
    }));
  };

  const openRepliesPopup = (tweetId) => {
    setSelectedTweet(tweets[tweetId]);
    setShowRepliesPopup(true);
  };

  return (
    <div className="App">
      <div className="tabs">
        <button className="nav-button" onClick={() => setPage('home')}>
          Home
        </button>
        <button className="nav-button" onClick={() => setPage('profile')}>
          Profile
        </button>
      </div>

      {page === 'home' && <div className="tweet-section">{showHomeTweet()}</div>}
      {page === 'profile' && (
        <div>
          <div className="profile-header">
            <div className="profile-banner"></div>
            <img src="pfp.jpg" alt="Profile Image" className="profile-pic" />
            <div className="profile-info">
              <div className="name">
                Donald J. Trump
                <img src="verified.png" alt="Verified Checkmark" />
              </div>
              <div className="username">@realDonaldTrump</div>
              <div className="profile-details">
                <div>45th President of the United States of America 🇺🇸</div>
                <div>
                  <a href="https://www.donaldjtrump.com">
                    <img src="url.png" alt="URL Icon" /> donaldjtrump.com
                  </a>
                </div>
                <div className="joined">Joined March 2009</div>
              </div>
              <div className="profile-stats">
                <div>
                  <div className="stat-number">59</div>
                  <div>Tweets</div>
                </div>
                <div>
                  <div className="stat-number">88.9M</div>
                  <div>Followers</div>
                </div>
                <div>
                  <div className="stat-number">51</div>
                  <div>Following</div>
                </div>
              </div>
            </div>
          </div>

          <div className="tabs">
            <div className="tab active" onClick={() => setPage('tweets')}>
              Tweets
            </div>
            <div className="tab" onClick={() => setPage('replies')}>
              Replies
            </div>
            <div className="tab" onClick={() => setPage('media')}>
              Media
            </div>
          </div>

          <div className="tweet-section">{showTab('tweets')}</div>

          <button className="new-tweet-button" onClick={() => setShowTweetPopup(true)}>
            Tweet
          </button>
        </div>
      )}

      {showTweetPopup && (
        <div className="popup" style={{ display: 'flex' }}>
          <div className="popup-content">
            <textarea
              id="new-tweet-text"
              value={newTweetText}
              onChange={(e) => setNewTweetText(e.target.value)}
              placeholder="What is happening?!"
            ></textarea>
            <button onClick={postNewTweet}>Post</button>
          </div>
        </div>
      )}

      {showRepliesPopup && selectedTweet && (
        <div className="popup" style={{ display: 'flex' }}>
          <div className="popup-content">
            <div className="tweet">
              <img src={selectedTweet.profilePic} alt="Profile Image" />
              <div className="tweet-content">
                <div className="tweet-header">
                  <strong>{selectedTweet.name}</strong> <span className="tweet-username">@{selectedTweet.username}</span>
                  <span className="tweet-date">{new Date(selectedTweet.timestamp).toLocaleDateString()}</span>
                  {selectedTweet.username === 'realDonaldTrump' ? (
                    <img src="verified.png" alt="Verified Checkmark" style={{ width: '16px', height: '16px', marginLeft: '5px' }} />
                  ) : null}
                </div>
                <div>{selectedTweet.content}</div>
                <div className="actions">
                  <button>{selectedTweet.likes || 0}</button>
                  <button>{selectedTweet.retweets || 0}</button>
                  <button>{selectedTweet.repliesCount || 0}</button>
                  <button>Share</button>
                  <button>Analytics</button>
                  <button>Bookmark</button>
                </div>
              </div>
            </div>

            <div className="replies">
              {selectedTweet.replies.map((reply, index) => (
                <div className="tweet" key={index}>
                  <img src={reply.profilePic} alt="Profile Image" />
                  <div className="tweet-content">
                    <div className="tweet-header">
                      <strong>{reply.name}</strong> <span className="tweet-username">@{reply.username}</span>
                      <span className="tweet-date">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div>{reply.content}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowRepliesPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

