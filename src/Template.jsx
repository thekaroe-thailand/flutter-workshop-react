import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Template(props) {
    return <>
        <div class="wrapper">
            <Navbar />

            <aside class="main-sidebar sidebar-dark-primary elevation-4">
                <Sidebar />
            </aside>

            <div class="content-wrapper">
                <div class="content-header">
                    <div class="container-fluid">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Template;