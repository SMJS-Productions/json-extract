import { getInput, setOutput, setFailed } from "@actions/core";

let goals: string | string[] = JSON.parse(getInput("paths"));

if (Array.isArray(goals)) {
    goals = goals.map((value) => value.toString());
} else {
    goals = [goals.toString()];
}

try {
    const json = JSON.parse(getInput("json"));

    goals.forEach((goal) => {
        const goalKeys = goal.split(".");
        const value = goalKeys.reduce((acc, key) => acc[key], json);

        setOutput(goalKeys.pop(), value);
    });
} catch (error) {
    setFailed(error.message);
}