import Header from "../components/Header";


const CommonLayout = (Component) => (props)  => {
    return (
        <div>
            <Header />
            <div>
                <Component {...props} />
            </div>
        </div>
    )
}

export default CommonLayout;