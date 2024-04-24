const Icon = ({icon, onClick}) => {

    return <i translate="no" onClick={onClick} className="material-icons">
        {icon}
    </i>
}

export default Icon;