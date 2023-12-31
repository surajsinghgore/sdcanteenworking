import { Pie as ChartJS } from 'chart.js/auto'
import { Pie }            from 'react-chartjs-2'
export default function TopItems({allData,tag,trend}) {
let lables=[]
let mainData=[]
if(allData!=undefined){
for(let i=0;i<allData.length;i++){
mainData.push(allData[i].count);
lables.push(allData[i].name[0]);
}
}

if(trend!=undefined){
for(let i=0;i<trend.length;i++){
mainData.push(trend[i].NumberOfSearch);
lables.push(trend[i].ItemName);
}


}
const data={
 labels: lables,
  datasets: [{
       data: mainData,
     backgroundColor: [
              "#FDB45C",
              "#878a87",
              "#F7464A",
              "#05f579",
              "#e805ce",
              "#0549e8",
              "#05f5e1",
             "#31de45" ,
              "#ed721a",
             "#9107db" ,
            ],
           label:tag,
    hoverOffset: 4
  }],
  options: {
        responsive: true,
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Doughnut Chart'
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    }
}



  return (
    <Pie data={data}/>
  )
}
