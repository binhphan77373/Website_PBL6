import  { useEffect } from 'react';
import Topbar from '../modules/Topbar';
import "../index.scss";
import Result from '../modules/Result';
const ResultPage = () => {
  useEffect(() => {
    document.title = "Home Page";
  }, []);
  return (
    <>
      <Topbar></Topbar> 
      <Result></Result>
    </>
  );
};

export default ResultPage;