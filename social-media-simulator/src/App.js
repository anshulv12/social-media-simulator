import React, { useState } from 'react';
import './App.css';
import pfp from './images/pfp.jpg';

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
    'Obviously hacked but I agree',
    "Don't care Kamala clears ratio + L",
    'Heard that for 4 years already',
    'What intern is running this account',
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
        <img src={cnnTweet.profilePic} alt="Profile" />
        <div className="tweet-content">
          <div className="tweet-header">
            <strong>{cnnTweet.name}</strong> <span className="tweet-username">@{cnnTweet.username}</span>
            <span className="tweet-date">{new Date(cnnTweet.timestamp).toLocaleDateString()}</span>
          </div>
          <div>{cnnTweet.content}</div>
          <div className="actions">
            <button>❤️ {cnnTweet.likes || 0}</button>
            <button>🔁 {cnnTweet.retweets || 0}</button>
            <button>💬 {cnnTweet.repliesCount || 0}</button>
            <button>🔗 Share</button>
            <button>📊 Analytics</button>
            <button>🔖 Bookmark</button>
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
          <img src={tweet.profilePic} alt="Profile" />
          <div className="tweet-content">
            <div className="tweet-header">
              <strong>{tweet.name}</strong> <span className="tweet-username">@{tweet.username}</span>
              <span className="tweet-date">{new Date(tweet.timestamp).toLocaleDateString()}</span>
              {tweet.username === 'realDonaldTrump' && (
                <img src="verified.png" alt="Verified" style={{ width: '16px', height: '16px', marginLeft: '5px' }} />
              )}
            </div>
            <div>{tweet.content}</div>
            <div className="actions">
              <button>❤️ {tweet.likes || 0}</button>
              <button>🔁 {tweet.retweets || 0}</button>
              <button>💬 {tweet.repliesCount || 0}</button>
              <button>🔗 Share</button>
              <button>📊 Analytics</button>
              <button>🔖 Bookmark</button>
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
          profilePic: {pfp},
          content: newTweetText,
          timestamp: tweetId,
          likes: 0,
          retweets: 0,
          repliesCount: 0,
        },
      });
      setNewTweetText('');
      setShowTweetPopup(false);
    }
  };

  const openRepliesPopup = (tweetId) => {
    setSelectedTweet(tweets[tweetId]);
    setShowRepliesPopup(true);
  };

  return (
    <div className="App">
      <div className="header-buttons">
        <button className="nav-button" onClick={() => setPage('home')}>Home</button>
        <button className="nav-button" onClick={() => setPage('profile')}>Profile</button>
      </div>

      {page === 'profile' && (
        <div className="profile-header">
          <div className="profile-banner"></div>
          <img src={pfp} alt="Profile" className="profile-pic" />
          <div className="profile-info">
            <div className="name">Donald J. Trump <img src="pfp.jpg" alt="Verified" style={{ width: '16px', height: '16px', marginLeft: '5px' }} /></div>
            <div className="username">@realDonaldTrump</div>
          </div>
          <div className="profile-details">
            45th President of the United States of America🇺🇸. Working to Make America Great Again! 
          </div>
          <div className="profile-stats">
            <div>
              <strong className="stat-number">88M</strong> Followers
            </div>
            <div>
              <strong className="stat-number">51</strong> Following
            </div>
            <div>
              <strong className="stat-number">58k</strong> Tweets
            </div>
          </div>
        </div>
      )}

      {page === 'home' && (
        <div className="tweet-section">
          {showHomeTweet()}
          <button className="new-tweet-button" onClick={() => setShowTweetPopup(true)}>New Tweet</button>
        </div>
      )}

      {page === 'tweets' && (
        <div className="tweet-section">
          {showTab('tweets')}
          <button className="new-tweet-button" onClick={() => setShowTweetPopup(true)}>New Tweet</button>
        </div>
      )}

      {showTweetPopup && (
        <div className="popup">
          <div className="popup-content">
            <textarea value={newTweetText} onChange={(e) => setNewTweetText(e.target.value)} />
            <button onClick={postNewTweet}>Post Tweet</button>
            <button onClick={() => setShowTweetPopup(false)}>Close</button>
          </div>
        </div>
      )}

      {showRepliesPopup && selectedTweet && (
        <div className="popup">
          <div className="popup-content">
            <div className="tweet">
              <img src={selectedTweet.profilePic} alt="Profile" />
              <div className="tweet-content">
                <div className="tweet-header">
                  <strong>{selectedTweet.name}</strong> <span className="tweet-username">@{selectedTweet.username}</span>
                  <span className="tweet-date">{new Date(selectedTweet.timestamp).toLocaleDateString()}</span>
                </div>
                <div>{selectedTweet.content}</div>
                <div className="actions">
                  <button>❤️ {selectedTweet.likes || 0}</button>
                  <button>🔁 {selectedTweet.retweets || 0}</button>
                  <button>💬 {selectedTweet.repliesCount || 0}</button>
                  <button>🔗 Share</button>
                  <button>📊 Analytics</button>
                  <button>🔖 Bookmark</button>
                </div>
              </div>
            </div>

            <div className="replies">
              {selectedTweet.replies.map((reply, index) => (
                <div className="tweet" key={index}>
                  <img src={reply.profilePic} alt="Profile" />
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
