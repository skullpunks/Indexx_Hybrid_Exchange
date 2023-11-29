import { useCallback, useState } from "react";

const useFetch = () => {
    //State to update and store the fetched value
    const [value, setValue] = useState([]);
    //State to update the number of days of value it needs to be fetched
    const [day, setDay] = useState(0.04);

    const fetchDaysValue = day;

    //API function to handle all the api requests
    //Using useCallback because we will run this function in another component with useEffect Hook
    const api = useCallback(
        async (url: string) => {
            
            //Fetch API
            const response = await fetch(`${url}${fetchDaysValue}`);
            if (!response.ok) {
                
                throw new Error("Couldn't fetch Graph");
            }
            const responseData = await response.json();
            const data = responseData.prices;
            // response data will be formatted here
            const formattedData = (val: any) => {
                return val.map((v: any) => {
                    return {
                        time: new Date(v[0]),
                        price: v[1],
                    };
                });
            };
          
            const graphValues = formattedData(data);
            setValue(graphValues);

        },
        [fetchDaysValue]
    );

    const yearClickHandler = () => {
        setDay(365);
    };
    const monthClickHandler = () => {
        setDay(31);
    };
    const weekClickHandler = () => {
        setDay(7);
    };
    const dayClickHandler = () => {
        setDay(1);
    };
    const hourClickHandler = () => {
        setDay(0.04);
    };
    //
    //Values to return to respective components where useFetch custom hook is being used
    return {
        yearClickHandler: yearClickHandler,
        monthClickHandler: monthClickHandler,
        weekClickHandler: weekClickHandler,
        dayClickHandler: dayClickHandler,
        hourClickHandler: hourClickHandler,
        value: value,
        Error: Error,
        api: api,
        day
    };
};

export default useFetch;
