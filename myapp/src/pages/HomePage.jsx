import  { useEffect } from 'react';
import Topbar from '../modules/Topbar';
import Body from '../modules/Body';
import Body1 from '../modules/Body1';
import "../index.css";
const HomePage = () => {
  useEffect(() => {
    document.title = "Home Page";
  }, []);
  return (
    <>
      <Topbar></Topbar> 
      <Body1></Body1>
    </>
  );
};

export default HomePage;