import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>Taylor Swift</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search Twitter" />
        </div>
      </div>

      <div className="profile">
        <div className="cover-photo"></div>
        <div className="profile-info">
          <img src="https://via.placeholder.com/120" alt="Profile Picture" />
          <div className="info">
            <h2>Taylor Swift</h2>
            <p>@taylorswift13</p>
            <p>89M Followers | 79 Following</p>
            <p>
              American singer-songwriter. 10x Grammy winner. Lover of cats and
              coffee.
            </p>
          </div>
        </div>
      </div>

      <div className="tabs">
        <div className="active">Tweets</div>
        <div>Replies</div>
        <div>Media</div>
        <div>Likes</div>
      </div>

      <div className="content">
        <div className="tweet">
          <div className="author">Taylor Swift @taylorswift13</div>
          <div className="content">
            Excited to announce my new album dropping next month! Stay tuned!
            🎶✨
          </div>
          <div className="date">July 26, 2024</div>
          <div className="actions">
            <span>Reply</span>
            <span>Retweet</span>
            <span>Like</span>
            <span>Share</span>
          </div>
        </div>

        <div className="tweet">
          <div className="author">Taylor Swift @taylorswift13</div>
          <div className="content">
            Had an amazing time performing at the concert last night! Thank you
            all for the love and support! 💖🎤
          </div>
          <div className="date">July 24, 2024</div>
          <div className="actions">
            <span>Reply</span>
            <span>Retweet</span>
            <span>Like</span>
            <span>Share</span>
          </div>
        </div>

        <div className="tweet">
          <div className="author">Taylor Swift @taylorswift13</div>
          <div className="content">
            My cats have taken over my recording studio. I think it's their new
            favorite spot! 🐱🎵
          </div>
          <div className="date">July 22, 2024</div>
          <div className="actions">
            <span>Reply</span>
            <span>Retweet</span>
            <span>Like</span>
            <span>Share</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
