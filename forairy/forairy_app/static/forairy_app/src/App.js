import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/LoginForm';
import Blog from './components/Blog';

const App = () => {
  const yourCsrfToken = "your_actual_csrf_token_value";
  const diaryPosts = [];

  return (
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/blog" render={() => <Blog posts={diaryPosts} csrf_token={yourCsrfToken} />} />
    </Router>
  );
};

export default App;
