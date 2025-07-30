import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Box } from '@mui/material';
import AreaSearch from './Components/AreaSearch';
import Navbar from './Components/Navbar';
import CragSelection from './Components/CragSelection';
import TripPlanner from './Components/TripPlannerSections/TripPlanner';
import { TripProvider } from './Context/TripContext';
import ClimbDescription from './Components/ClimbDescription';

export const apolloClient = new ApolloClient({
  uri: 'https://stg-api.openbeta.io',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <TripProvider>
      <ApolloProvider client={apolloClient}>
        <Box className="App">
          <Navbar></Navbar>
            <Router>
              <Routes>
                <Route path='/' element={<LandingPage/>}/>
                <Route path="/start-planning" element={<AreaSearch/>}/>
                <Route path="trip-planner" element={<TripPlanner/>}></Route>
              </Routes>
            </Router>
        </Box>
      </ApolloProvider>
    </TripProvider>
  );
}

export default App;
