import { Router, Route, Switch } from "react-router-dom";
import PostList from "./Containers/PostList";
import 'semantic-ui-css/semantic.min.css';
import Layout from "./Containers/Layout";
import PostDelete from "./Containers/PostDelete";
import PostDetail from "./Containers/PostDetail";
import PostCreate from "./Containers/PostCreate";
import PostUpdate from "./Containers/PostUpdate";
import {history} from "./helpers/history"

function App() {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route path="/create" component={PostCreate} />
          <Route path="/posts/:postSlug" component={PostDetail} />
          <Route path="/posts/:postSlug/update" component={PostUpdate} />
          <Route path="/posts/:postSlug/delete" component={PostDelete} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
