import { readDatabase, writeToDatabase } from "@/services";
import { Box, Group, NumberInput, Stack, Switch, Title } from "@mantine/core";
import { ChangeEvent, useEffect, useState } from "react";

const initialData = {
  appliances: {
    ac: {
      power_on: false,
      temperature: 0,
    },
    switches: {
      lamp_on: false,
      outlet_on: false,
    },
    room_temperature: 0,
  },
};

const Dashboard = () => {
  const [data, setData] = useState(initialData);
  const [num, setNum] = useState<number | "">(18);

  const { ac, switches } = data.appliances;

  const handleChangeACStatus = (event: ChangeEvent<HTMLInputElement>) => {
    writeToDatabase("/appliances/ac/power_on", event.currentTarget.checked);
  };

  const handleChangeACTemperature = (value: number) => {
    writeToDatabase("/appliances/ac/temperature", value);
  };

  const handleChangeLampStatus = (event: ChangeEvent<HTMLInputElement>) => {
    writeToDatabase(
      "/appliances/switches/lamp_on",
      event.currentTarget.checked
    );
  };

  const handleChangeOutletStatus = (event: ChangeEvent<HTMLInputElement>) => {
    writeToDatabase(
      "/appliances/switches/outlet_on",
      event.currentTarget.checked
    );
  };

  useEffect(() => {
    readDatabase(setData);
  }, []);

  return (
    <Stack sx={{ margin: 20 }}>
      <Title order={1} sx={{ marginBottom: 20 }}>
        SmartBox Home
      </Title>

      <Group>
        <Switch
          size="md"
          checked={ac.power_on}
          onChange={handleChangeACStatus}
        />
        <Title order={3}>AC Power</Title>
      </Group>

      {ac.power_on && (
        <Group>
          <NumberInput
            value={ac.temperature}
            min={18}
            max={26}
            onChange={handleChangeACTemperature}
            onKeyDown={(event) => {
              event.preventDefault();
            }}
            styles={{ input: { width: 60, textAlign: "center" } }}
          />
          <Title order={3}>AC Temperature</Title>
        </Group>
      )}

      <Group>
        <Switch
          size="md"
          checked={switches.lamp_on}
          onChange={handleChangeLampStatus}
        />
        <Title order={3}>Lamp Status</Title>
      </Group>

      <Group>
        <Switch
          size="md"
          checked={switches.outlet_on}
          onChange={handleChangeOutletStatus}
        />
        <Title order={3}>Outlet Status</Title>
      </Group>
      <Title order={3}>
        Room Temperature : {data.appliances.room_temperature} C
      </Title>
    </Stack>
  );
};

export default Dashboard;
