import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const BarChart = ({ terms, loading, title }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const dt = terms.map((term) => term.label).join(' ');
    const separation = dt.split(' ');
    const counts = {};
    const data = [];
    for (let i = 0; i < separation.length; i++) {
      counts[separation[i]] = 1 + (counts[separation[i]] || 0);
    }

    for (const term in counts) {
      data.push({ name: term, y: counts[term] });
    }

    setChartData(data);
  }, [terms]);

  const options = {
    chart: {
      type: 'bar',
    },
    title: {
      text: title,
    },
    loading,
    xAxis: {
      type: 'category',
    },
    yAxis: {
      title: {
        text: 'Total frequency',
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        pointPadding: 0.4,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y:f}',
        },
      },
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:f}</b> of total<br/>',
    },

    series: [
      {
        name: 'Words',
        colorByPoint: true,
        data: chartData,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

BarChart.propTypes = {
  terms: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    terms: state.term.terms,
    loading: state.term.loading,
  };
};

export default connect(mapStateToProps)(BarChart);
