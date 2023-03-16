//import appBrandingLogo from './lueminourlogo100by100.svg';

function LueminourPage(){
    return(
        <>
            <nav className='navbar navbar-expand-sm lue-navbar fixed-top'>
                <div className='container-fluid'>
                    <a className='navbar-brand' href='/'>
                        Lueminour
                    </a>
                </div>
            </nav>
            <main className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 bg-info position-absolute h-100">
                        <div className="display-1 mt-5">ONE</div>
                    </div>
                    <div className="col-sm-6 offset-sm-3 bg-warning position-absolute h-100 lue-card-scroll-area">
                        <div className="display-1 mt-5">TWO</div>
                        <div style={{height: '800px', width: '450px', backgroundColor: 'red', marginTop: '24px'}}>
                            <div className="display-2">C-1</div>
                        </div>
                        <div style={{height: '800px', width: '450px', backgroundColor: 'red', marginTop: '24px'}}>
                            <div className="display-2">C-2</div>
                        </div>
                        <div style={{height: '800px', width: '450px', backgroundColor: 'red', marginTop: '24px'}}>
                            <div className="display-2">C-3</div>
                        </div>
                        <div style={{height: '800px', width: '450px', backgroundColor: 'red', marginTop: '24px'}}>
                            <div className="display-2">C-4</div>
                        </div>
                    </div>
                    <div className="col-sm-3 bg-info position-absolute h-100 offset-sm-9">
                        <div className="display-1 mt-5">THREE</div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default LueminourPage;