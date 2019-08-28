import React from 'react';

import { fetchSchedule, parseScheduleData } from '../util/DBUtil';
import { ScheduledProgramDescriptor } from '../components/ScheduledProgramDescriptor';

export class ScheduleContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            schedule: [],
            upcomingShows: false
        }

        this.populateSchedule = this.populateSchedule.bind(this);
    }

    componentWillMount() {
        fetchSchedule(this.populateSchedule);
    }

    populateSchedule(schedule) {
        let scheduleData = parseScheduleData(schedule);

        scheduleData = this.filterSchedule(scheduleData);

        if (scheduleData.length > 0) {
            this.setState({
                schedule: scheduleData,
                upcomingShows: true
            });
        }
    }

    filterSchedule(oldSchedule) {
        let scheduleData = [];
        const now = Date.now();
        oldSchedule.forEach(show => {
            let timeDif = show.endDate - now;
            if (0 < timeDif && timeDif < 86400000) {
                scheduleData.push(show);
            }
        });

        return scheduleData;
    }

    render() {
        return (
            <h4 className="TextContainer">
                <strong>
                    Scheduled shows:
                </strong>
                <br />
                {!this.state.upcomingShows ? 'No upcoming shows scheduled... Please check back tomorrow!' : ''}
                {this.state.schedule.map(schedule => (
                    <ScheduledProgramDescriptor title={schedule.title} startDate={schedule.startDate} endDate={schedule.endDate} key={schedule.title + schedule.startDate} />
                ))}
            </h4>
        )
    }
}