/* eslint-disable no-unsafe-optional-chaining */
import { fromEvent, map } from "rxjs";

const progressBarElement: HTMLDivElement | null = document.querySelector('.progress-bar')


const calculatePercentage = function (event: any) {
    const clientHeight = event?.target?.documentElement.clientHeight
    const scrollHeight = event?.target?.documentElement.scrollHeight
    const scrollTop = event?.target?.documentElement.scrollTop

    return (100 * (scrollTop / (scrollHeight - clientHeight))).toFixed(2)

}
const scrollEvent$ = fromEvent(document, 'scroll').pipe(
    map((event) => {

        return calculatePercentage(event);
    })
)

scrollEvent$.subscribe((percentage) => {
    if (progressBarElement !== null) {
        progressBarElement.style.width = `${percentage}%`;
    }
});

