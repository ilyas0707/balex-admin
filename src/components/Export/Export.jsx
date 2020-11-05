import React from 'react'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import Styles from './Export.module.css'

export const Export = ({tableData, fileName}) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportToExcel = (tableData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(tableData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    return (
        <button className={Styles.button} onClick={(e) => {e.preventDefault(); exportToExcel(tableData,fileName)}}>
            <i className={`material-icons ${Styles.icon}`}>get_app</i>
        </button>
    )
}