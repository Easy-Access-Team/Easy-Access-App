import formatDateTime from "../../../utils/formatDateTime";
const RecordsInstalation = ({data}) => {
    return <ul>{data && data.map(record => <li key={record.id}>
            {record.userDisplay}, {record.type} - {formatDateTime(record.date)}
        </li>)}
    </ul>
}

export default RecordsInstalation;