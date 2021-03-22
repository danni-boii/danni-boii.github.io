const { BrowserRouter, Link, Route, Switch } = ReactRouterDOM;
const { useRouteMatch, useParams, useLocation } = ReactRouterDOM;
const Router = BrowserRouter;

function LongLink({ label, to, activeOnlyWhenExact }) {
    let match = useRouteMatch({
        path: to,
        exact: activeOnlyWhenExact,
    });
    return (
        <li className={match ? "active" : ""}>
            {match && "> "}
            <Link to={to}>{label}</Link>{" "}
        </li>
    );
}

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="container mt-3">
                    <ul>
                        <LongLink activeOnlyWhenExact={true} to="/" label="Home" />
                        <LongLink to="/file" label="Image" />
                        <LongLink to="/slideshow" label="Slide Show" />
                    </ul>
                    <hr />
                        <Switch>
                            <Route path="/" component={Home} />
                            <Route path="/file" component={Image} />
                            <Route path="/slideshow" component={Slideshow} />
                            <Route path="*" component={NoMatch} />
                        </Switch>
                </div>
            </Router>
        );
    }
}

class Home extends React.Component {
    render() {
        return (
            <>
                <div className="container">
                    <h2>Home</h2>
                    <br />
                    <div className="treeview">
                        <ul className="list-group">
                            <li className="list-group-item node-treeview1">
                                <span> {">"} App - Component</span>
                                <ul className="list-group">
                                    <li className="list-group-item node-treeview1">
                                        <span> {">"} Home - Component</span>
                                    </li>
                                    <li className="list-group-item node-treeview1">
                                        <span> {">"} Image - Component</span>
                                        <ul className="list-group">
                                            <li className="list-group-item node-treeview1">
                                                <span> {">"} Main - Component</span>
                                                <ul className="list-group">
                                                    <li className="list-group-item node-treeview1">
                                                        <span> {">"} FileCard - Component</span>
                                                        <ul className="list-group">
                                                            <li className="list-group-item node-treeview1">
                                                                <span> {">"} File - Component</span>
                                                            </li>
                                                            <li className="list-group-item node-treeview1">
                                                                <span> {">"} NoMatch - Component (Call)</span>
                                                            </li>
                                                        </ul>
                                                        <ul className="list-group">
                                                            <li className="list-group-item node-treeview1">
                                                                <span> {"-"} Selected - State</span>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="list-group-item node-treeview1">
                                        <span> {">"} Slideshow - Component</span>
                                        <ul className="list-group">
                                            <li className="list-group-item node-treeview1">
                                                <span> {">"} Slideshow_FileCard - Component</span>
                                                <ul className="list-group">
                                                    <li className="list-group-item node-treeview1">
                                                        <span> {"-"} this.props.state - state (Inherianced from Slideshow)</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <ul className="list-group">
                                                <li className="list-group-item node-treeview1">
                                                    <span> {"-"} currentIMGid - state</span>
                                                </li>
                                                <li className="list-group-item node-treeview1">
                                                    <span> {"-"} currentInterval - state</span>
                                                </li>
                                                <li className="list-group-item node-treeview1">
                                                    <span> {"-"} display_slides - state</span>
                                                </li>
                                                <li className="list-group-item node-treeview1">
                                                    <span> {"-"} last_TIevent_id - state</span>
                                                </li>
                                                <li className="list-group-item node-treeview1">
                                                    <span> {"-"} pause - state</span>
                                                </li>
                                            </ul>
                                        </ul>
                                    </li>
                                    <li className="list-group-item node-treeview1">
                                        <span> {">"} NoMatch - Component</span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        );
    }
}

class Main extends React.Component {
    render() {
        return (
            <main className="container">
                <FileCard />
            </main> /* Main vs main? */
        );
    }
}

class Image extends React.Component {
    render() {
        return <Main />;
    }
}

class NoMatch extends React.Component {
    render() {
        return (
            <div>
                <h2>Error 404 Page Not Found.</h2>
                <h3>{this.props.location.pathname + " Not found!"}</h3>
            </div>
        );
    }
}

class FileCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selected: -1 };
    }
    render() {
        return (
            <>
                <Router>
                    {data.map((file, index) => (
                        <div
                            key={index}
                            className="card d-inline-block m-2"
                            style={{ width: this.state.selected == index ? 220 : 200 }}
                            onMouseOver={(e) => this.PictureMouseOver(index, e)}
                            onMouseOut={(e) => this.PictureMouseOut(index, e)}
                        >
                            <img src={"/images/" + file.filename} alt={file.remarks} className="w-100" />
                            <div className="card-body">
                                <Link to={"/file/" + index}>{file.filename}</Link>
                                <p className="card-text">Year: {file.year}</p>
                                {this.state.selected == index && <p className="card-text"> {file.remarks} </p>}
                            </div>
                        </div>
                    ))}

                    <Switch>
                        <Route path="/file/:id" component={File} />
                        <Route path="/file" />
                        <Route path="*" component={NoMatch} />
                    </Switch>
                </Router>
            </>
        );
    }
    PictureMouseOver(index, e) {
        if (this.state.selected != index) {
            this.setState({
                selected: index,
            });
        }
    }
    PictureMouseOut(index, e) {
        this.setState({
            selected: -1,
        });
    }
}

class File extends React.Component {
    //this.props.match.params.id    //This is the file id passed in
    render() {
        let fileId = this.props.match.params.id;
        if (fileId < 0 || fileId >= data.length) return <NoMatch />;
        else
            return (
                <>
                    <div className="card d-inline-block m-2" style={{ width: "100%" }}>
                        <img src={"/images/" + data[fileId].filename} alt={data[fileId].remarks} className="w-100" />
                        <div className="card-body">
                            <p className="card-text"> {data[fileId].filename} </p>
                            <p className="card-text">Year: {data[fileId].year}</p>
                            <p className="card-text"> {data[fileId].remarks} </p>
                        </div>
                    </div>
                </>
            );
    }
}

class Slideshow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display_slides: false,
            currentInterval: 2500,
            currentIMGid: 0,
            pause: false,
            last_TIevent_id: 0,
        };

        //console.log("SlideShow start");
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group mr-2" role="group" aria-label="First group">
                            {this.state.display_slides == false ? (
                                <button type="button" className="btn btn-info" onClick={this.startButtonClick.bind(this)}>
                                    Start slideshow
                                </button>
                            ) : (
                                <button type="button" className="btn btn-warning" onClick={this.startButtonClick.bind(this)}>
                                    Hide slideshow
                                </button>
                            )}
                            {this.state.pause == false || this.state.display_slides == false ? (
                                <button type="button" className="btn btn-danger" onClick={this.stopButtonClick.bind(this)}>
                                    Stop slideshow
                                </button>
                            ) : (
                                <button type="button" className="btn btn-success" onClick={this.stopButtonClick.bind(this)}>
                                    Resume slideshow
                                </button>
                            )}

                            <button type="button" className="btn btn-outline-dark" onClick={this.slowerButtonClick.bind(this)}>
                                Slower
                            </button>
                            <button type="button" className="btn btn-outline-dark" onClick={this.fasterButtonClick.bind(this)}>
                                Faster
                            </button>
                        </div>
                    </div>
                </div>
                <div className="container mt-3">{this.state.display_slides ? <Slideshow_FileCard state={this.state} /> : <br />}</div>
            </>
        );
    }
    componentDidMount() {
        clearInterval(this.state.last_TIevent_id);
        let num = setInterval(() => {
            //console.log("Slideshow interval");
            if (this.state.pause == false) {
                let tse = this.state.currentIMGid + 1;
                if (this.state.currentIMGid <= data.length - 2) {
                    this.setState({
                        currentIMGid: tse,
                        last_TIevent_id: num,
                    });
                } else {
                    this.setState({
                        currentIMGid: 0,
                        last_TIevent_id: num,
                    });
                }
            }
        }, this.state.currentInterval);
    }

    startButtonClick() {
        this.setState({
            display_slides: !this.state.display_slides,
        });
    }
    stopButtonClick() {
        this.setState({
            pause: !this.state.pause,
        });
    }
    slowerButtonClick() {
        this.componentDidMount();

        this.setState({
            currentInterval: this.state.currentInterval * 2,
        });
        if (this.state.currentInterval >= 50000) {
            this.setState({
                currentInterval: 50000,
            });
            return;
        }
    }
    fasterButtonClick() {
        this.componentDidMount();

        this.setState({
            currentInterval: this.state.currentInterval / 2,
        });
        if (this.state.currentInterval <= 1) {
            this.setState({
                currentInterval: 1,
            });
            return;
        }
    }
}

class Slideshow_FileCard extends React.Component {
    render() {
        return (
            <>
                {data.map((file, index) => (
                    <div key={index} className="card" style={{ display: this.props.state.currentIMGid == index ? "block" : "none" }}>
                        <img src={"images/" + file.filename} alt=" {file.remarks}" className="w-100" />
                        <div className="card-body">
                            <h6 className="card-title">{file.filename}</h6>
                            <p className="card-text">Year: {file.year}</p>
                            {this.props.state.currentIMGid == index ? <p className="cardtext"> {file.remarks} </p> : <br />}
                        </div>
                    </div>
                ))}
            </>
        );
    }
}

const data = [
    { filename: "cuhk-2013.jpg", year: 2013, remarks: "Sunset over CUHK" },
    { filename: "cuhk-2017.jpg", year: 2017, remarks: "Bird's-eye view of CUHK" },
    { filename: "sci-2013.jpg", year: 2013, remarks: "The CUHK Emblem" },
    { filename: "shb-2013.jpg", year: 2013, remarks: "The Engineering Buildings" },
    { filename: "stream-2009.jpg", year: 2009, remarks: "Nature hidden in the campus" },
];

ReactDOM.render(<App />, document.querySelector("#app2"));
