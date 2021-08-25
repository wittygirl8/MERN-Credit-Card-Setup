//Importing Dependencies. 
import  {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

//Importing Pages.
import Main_Page from './pages/main_page/main_page.js';
import Thankyou_Page from './pages/Thankyou_page/Thanks.js';


function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route exact path='/'>
            <Main_Page/>
        </Route>
        <Route exact path='/thank-you'>
          <Thankyou_Page/>
        </Route>
      </Switch>
    </Router>      
    </>
  );
}

export default App;
