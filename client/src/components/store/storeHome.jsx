import React, { useEffect } from 'react';
import Header from '../header';

import Calendar from '../calendar';
import NavBar from '../navBar';

const StoreHome = ({store_info, url_head}) => {
    
    useEffect(() => {
        document.title = "Mechanics - Store";
    }, []);

    return (<>
    
        <Header title={store_info.name} img={store_info.imgurl} />
        <NavBar navtype='store' />
        <Calendar urlhead={url_head} storeInfo={store_info} user="store" />
    
    </>);
}

export default StoreHome;