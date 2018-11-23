import $ from 'jquery';
import {parseCode} from './code-analyzer';

let tokens=[];

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let i,j;
        let codeToParse = $('#codePlaceholder').val();
        tokens = parseCode(codeToParse);
        let html='<table>';
        html+='<tr>';
        for(j in tokens[0]) {
            html += '<th>' + j + '</th>';}
        html+='</tr>';
        for( i = 0; i < tokens.length; i++) {
            html += '<tr>';
            for( j in tokens[i] ) {
                html += '<td>' + tokens[i][j] + '</td>';}}
        html += '</table>';
        document.getElementById('container').innerHTML = html;
    });
});
