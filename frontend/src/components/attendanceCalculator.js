import { Typography } from '@mui/material';

// Start of Selection
export const calculateSubjectAttendancePercentage = (presentCount, totalSessions) => {
    if (totalSessions === 0 || presentCount === 0) {
        return 0;
    }
    const percentage = (presentCount / totalSessions) * 100;
    return parseFloat(percentage.toFixed(2)); // Limit to two decimal places
};

export const groupAttendanceBySubject = (subjectAttendance) => {
    const attendanceBySubject = {};

    subjectAttendance.forEach((attendance) => {
        const { subName, sessions, _id: subId } = attendance.subName;

        if (!attendanceBySubject[subName]) {
            attendanceBySubject[subName] = {
                present: 0,
                absent: 0,
                sessions: sessions,
                allData: [],
                subId: subId
            };
        }
        if (attendance.status === "Present") {
            attendanceBySubject[subName].present++;
        } else if (attendance.status === "Absent") {
            attendanceBySubject[subName].absent++;
        }
        attendanceBySubject[subName].allData.push({
            date: attendance.date,
            status: attendance.status,
        });
    });
    return attendanceBySubject;
}

export const calculateOverallAttendancePercentage = (subjectAttendance) => {
    let totalSessionsSum = 0;
    let presentCountSum = 0;
    const uniqueSubIds = new Set();

    subjectAttendance.forEach((attendance) => {
        const { _id: subId, sessions } = attendance.subName;
        if (!uniqueSubIds.has(subId)) {
            totalSessionsSum += parseInt(sessions);
            uniqueSubIds.add(subId);
        }
        presentCountSum += attendance.status === "Present" ? 1 : 0;
    });

    if (totalSessionsSum === 0 || presentCountSum === 0) {
        return 0;
    }

    return parseFloat(((presentCountSum / totalSessionsSum) * 100).toFixed(2));
};