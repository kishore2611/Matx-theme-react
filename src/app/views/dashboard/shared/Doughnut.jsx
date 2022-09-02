import React, { useEffect } from 'react';
import { useTheme } from '@mui/system';
import ReactEcharts from 'echarts-for-react';
import { useDispatch, useSelector } from 'react-redux';
import { getShifts } from 'app/redux/actions/EcommerceActions';

const DoughnutChart = ({ height, color = [] }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { shiftList } = useSelector((state) => state.ecommerce);

  const shift = []
  for(let i = 0; i < shiftList.length; i++) {
    shift.push(shiftList[i].jobTitle);
  }
  
  shift.count()
  console.log("shift ==================", shift);

  // const shift = shiftList.map((shift) => shift.jobTitle);

  // for(let i = 0; i < shift.length; i++) {
  //   if(shift[i] === 'CNA'){
  //     var CNA = shift[i]
  //   }
  // }
  // console.log("=====================length======================",CNA);
  // for(let i = 0; i < shift.length; i++) {
  //   if(shift[i] == 'ENT'){
  //     var ENT = shift[i].length
  //   }
  // }
  // for(let i = 0; i < shift.length; i++) {
  //   if(shift[i] == 'Surgen'){
  //     var Surgen = shift[i].length
  //   }
  // }
  // for(let i = 0; i < shift.length; i++) {
  //   if(shift[i] == 'Nurse'){
  //     var Nurse = shift[i].length
  //   }
  // }
  
  // console.log("=====================length======================",ENT);

  // console.log("=====================length======================",Surgen);
  // console.log("=====================length======================",Nurse);

  // if(shift === 'CNA'){
  //   console.log("CNA==============",shift);
  // }
  


  useEffect(() => {
    dispatch(getShifts());
  }, []);

  const option = {
    legend: {
      show: true,
      itemGap: 20,
      icon: 'circle',
      bottom: 0,
      textStyle: {
        color: theme.palette.text.secondary,
        fontSize: 13,
        fontFamily: 'roboto',
      },
    },
    tooltip: {
      show: false,
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    xAxis: [
      {
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
    ],

    series: [
      {
        name: 'Traffic Rate',
        type: 'pie',
        radius: ['45%', '72.55%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        hoverOffset: 5,
        stillShowZeroSum: false,
        label: {
          normal: {
            show: false,
            position: 'center', // shows the description data to center, turn off to show in right side
            textStyle: {
              color: theme.palette.text.secondary,
              fontSize: 13,
              fontFamily: 'roboto',
            },
            formatter: '{a}',
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '14',
              fontWeight: 'normal',
              // color: "rgba(15, 21, 77, 1)"
            },
            formatter: '{b} \n{c} ({d}%)',
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: [
          {
            value: 20,
            name: 'CNA',
          },
          {
            value: 20,
            name: 'ENT',
          },
          {
            value: 20,
            name: 'Surgen',
          },
          {
            value: 20,
            name: 'Nurse',
          },
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (
    <ReactEcharts
      style={{ height: height }}
      option={{
        ...option,
        color: [...color],
      }}
    />
  );
};

export default DoughnutChart;
