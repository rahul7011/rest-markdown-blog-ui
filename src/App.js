import { Router, Route, Switch } from "react-router-dom";
import PostList from "./Containers/PostList";
import 'semantic-ui-css/semantic.min.css';
import Layout from "./Containers/Layout";
import PostDelete from "./Containers/PostDelete";
import PostDetail from "./Containers/PostDetail";
import PostCreate from "./Containers/PostCreate";
import PostUpdate from "./Containers/PostUpdate";
import {history} from "./helpers/history"
import Login from "./Containers/Login";
import Signup from "./Containers/Signup";

function App() {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route path="/create" component={PostCreate} />
          <Route exact path="/posts/:postSlug" component={PostDetail} />
          <Route path="/posts/:postSlug/update" component={PostUpdate} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
