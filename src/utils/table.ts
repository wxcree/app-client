export function getClomus(tableData: any[]) {
    const columns = []
    for (const key in tableData[0]) {
        columns.push({
            title: key,
            dataIndex: key,
            key: key
        })
    }
    return columns
}
