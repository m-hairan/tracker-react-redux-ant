import React, { Component } from 'react'
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom'
import { Layout } from 'antd';

import PublicTrackingUI from './pages/PublicTracking'
import FAQ from './pages/FAQ'

import {NavbarWithLogo} from './components/General'

const { Header, Footer, Content } = Layout;

class App extends Component {
	state = {
	    currentLanguage: 'English',
	    loaded: false
	}

	changeLanguage(value){
	    this.setState({currentLanguage:value})
	}

	setPath(loaded) {
		this.setState({
			loaded: loaded
		})
	}

	render() {

		const path = window.location.pathname.split('/')[1]

	  	return(
	  		<Router>
		  		<Layout style={styles.layout} className="ant-layout">
		        	<Header style={styles.header}>
		            	<NavbarWithLogo current={this.state.currentLanguage} 
		            				changeLanguage={(e) => this.changeLanguage(e)} pgName={path} loaded={this.state.loaded}/>
		        	</Header>
		        	<Content style={styles.content} className="ant-content">
		        		
				    	<Switch>	
				    		<Route path="/faq" component={FAQ} />
					  	  	<Route path="/" render={(props) => <PublicTrackingUI {...props} path={(path) => this.setPath(path)} />} />
						</Switch>
					 	
		        	</Content>	

		        	<Switch>	
			    		<Route path="/faq" render={(props) => <Footer style={styles.footer} className="ant-footer">
			        		<p className="hint">Did you find your answer?</p>
		          			<p className="links">Feel free to contact us at&nbsp;
		          			<a className='contact-link' href="mailto: support@janio.asia">support@janio.asia</a></p>
	          			</Footer>} />
				  	  	<Route path="/" render={(props) => {
				  	  		return(
				  	  			this.state.loaded && path!=="" && <Footer style={styles.footer} className="ant-footer">
			        			<Link className="links" to="/faq">Need Help? Click Here!</Link></Footer>)
			        		}
			        	} />
					</Switch>
		        </Layout>
	        </Router>
		)
	}
}

const styles = {
  layout: {background: 'transparent', minHeight: '100vh'},
  header : {
    lineHeight: 'normal',
    height: 60
  },
  content: {
    maxWidth: 588,
    margin: '20px auto 0px auto',
    width: '100%',
    textAlign: 'center',
    padding: '0 20px'
  },
  footer: {
    background: '#050593',
    
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }
}

export default App
