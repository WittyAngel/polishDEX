import React, { useEffect, useRef, useState } from 'react';
import { BarData, ColorType, createChart, IChartApi, ISeriesApi } from 'lightweight-charts';
import { makeStyles } from '@material-ui/core';
import { PreLoader } from 'components/UI/PreLoader';
import { getCandles } from 'api/nomics';

// enum Intervals {
//   oneDay = "1d", 
//   fourHours = "4h", 
//   oneHour = "1h", 
//   halfHour = "30m", 
//   fiveMins = "5m", 
//   oneMin = "1m"
// };

type TVChartProps = {
  base: string,
  quote: string,
};

type NomicsCandle = {
  timestamp: string,
  low: number,
  open: number,
  close: number,
  high: number,
  volume: number,
  num_trades: number,
  price_outlier: string,
  volume_outlier: string
};

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: 615,
    border: '1px solid rgb(54, 60, 78)',
    display: 'flex',
    flexDirection: 'column'
  },
  toolbar: {
    height: 40,
    backgroundColor: 'rgb(23, 27, 38)',
    display: 'flex'
  },
  tradingview: {
    width: '100%',
    height: 580,
    borderTop: '1px solid rgb(54, 60, 78)',
  },
  label: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 20px',
    fontVariantCaps: 'all-petite-caps',
    color: 'gray'
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 5px',
    borderRadius: 5,
    margin: 5,
    cursor: 'pointer',
    color: '#cdcdcd',
    '&:hover': {
      backgroundColor: '#303030'
    },
    '&:active': {
      color: '#0000ff'
    },
  },
  divider: {
    borderLeft: '1px solid rgb(54, 60, 78)',
  },
});

const intervals: any = {
  minutes: ['1m', '5m', '30m'],
  hours: ['1h', '4h'],
  days: ['1d', '7d', 'M'],
}

const TradingViewChart = (props: TVChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chart = useRef<IChartApi>();
  const resizeObserver = useRef<ResizeObserver>();
  const { base, quote } = props;
  const classes = useStyles();

  const [candleSeries, setCandleSeries] = useState<ISeriesApi<'Candlestick'>>();
  const [volumeSeries, setVolumeSeries] = useState<ISeriesApi<'Histogram'>>();
  const [interval, setInterval] = useState('1d');
  const [start, setStart] = useState('2020-01-12T15:00:00Z');
  const [end, setEnd] = useState(new Date().toISOString());

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!chartContainerRef.current) {
      return () => console.error('Tradingview Container element is missing');
    }

    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: 'rgb(23, 27, 38)',
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: {
          color: 'rgb(35, 38, 50)',
        },
        horzLines: {
          color: 'rgb(35, 38, 50)',
        },
      },
      timeScale: {
        borderColor: '#485c7b',
        timeVisible: true
      },
    });
    const series = chart.current.addCandlestickSeries();
    setCandleSeries(series);

    const volume = chart.current.addHistogramSeries();
    setVolumeSeries(volume);

    return () => chart.current?.remove();
  }, []);

  // Resize chart on container resizes.
  useEffect(() => {
    resizeObserver.current = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      chart.current?.applyOptions({ width, height });
      setTimeout(() => {
        chart.current?.timeScale().fitContent();
      }, 0);
    });

    resizeObserver.current.observe(chartContainerRef.current as Element);

    return () => resizeObserver.current?.disconnect();
  }, [interval]);

  useEffect(() => {
    const fetchData = async () => {
      if (base && quote && candleSeries) {
        setIsLoading(true);
        if (interval === '7d') {
          await getCandles({
            ...props,
            interval: '1d',
            start,
            end
          }).then(res => {
            candleSeries?.setData(
              res.data.map((d: NomicsCandle) => ({ 
                time: new Date(d.timestamp).getTime() / 1000, 
                ...d 
              })).filter((e: any, i: number) => i % 7 === 6)
            );
          });
        } else if (interval === 'M') {
          const date = new Date().getDate();
          await getCandles({
            ...props,
            interval: '1d',
            start,
            end
          }).then(res => {
            candleSeries?.setData(
              res.data.map((d: NomicsCandle) => ({ 
                time: new Date(d.timestamp).getTime() / 1000, 
                ...d 
              })).filter((e: any, i: number) => new Date(e.time * 1000).getDate() === date)
            );
          });
        } else {
          const req: any = {
            ...props,
            interval,
            start,
            end
          };
          await getCandles(req).then(res => {
            candleSeries?.setData(res.data.map((d: NomicsCandle) => ({ time: new Date(d.timestamp).getTime() / 1000, ...d })));
            // volumeSeries?.setData(res.data.map((d: NomicsCandle) => ({ time: d.timestamp, value: d.volume })));
          });
        }
        setIsLoading(false);
      }
    }

    fetchData();
  }, [interval, base, quote, candleSeries]);

  const handleFilterClick = (e: any, filter: string) => {
    const buttons = e.target.parentElement.parentElement.querySelectorAll('span');
    buttons.forEach((el: any) => {
      const button = el;
      if (button.style.color === 'blue') {
        button.style.color = '#cdcdcd';
      }
    })
    e.target.style.color = 'blue';

    setInterval(filter)
    let date: string;
    switch (filter) {
      case '1m':
        date = new Date(new Date().getTime() - 24 * 3600000).toISOString()
        setStart(date)
        break;
    
      case '5m':
        date = new Date(new Date().getTime() - 3 * 24 * 3600000).toISOString()
        setStart(date)
        break;
      
      case '30m':
        date = new Date(new Date().getTime() - 14 * 24 * 3600000).toISOString()
        setStart(date)
        break;
        
      case '1h':
        date = new Date(new Date().getTime() - 30 * 24 * 3600000).toISOString()
        setStart(date)
        break;
          
      case '4h':
        date = new Date(new Date().getTime() - 120 * 24 * 3600000).toISOString()
        setStart(date)
        break;

      default:
        date = new Date(new Date().getTime() - 1000 * 24 * 3600000).toISOString()
        setStart(date)
        break;
    }
    setEnd(new Date().toISOString());
  }

  return (
    <div className={classes.root} >
      <div className={classes.toolbar} >
        {
          Object.keys(intervals).map((key: string) => {
            return (
              <div className={classes.toolbar} >
                <div className={classes.label} > {key} </div>
                <div className={classes.divider} />
                {
                  intervals[key].map((filter: string) => (
                    <span className={classes.button} onClick={(e) => handleFilterClick(e, filter)}> {filter} </span>
                  ))
                }
                <div className={classes.divider} />
              </div>
            )
          })
        }
      </div>
      {/* {isLoading && <PreLoader />} */}
      <div ref={chartContainerRef} className={classes.tradingview} />
    </div>
  );
};

export default TradingViewChart;