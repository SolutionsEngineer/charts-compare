### Project focuses on comparing react chart libraries

#### React profiler API is used compare charts rendering time

Actual time property is used to see render time.
Summed actual time of all render events gives us total render time of the component.
To check how long it took to paint the chart we can substract commit time of the first render event from the commit time of the last render event.
