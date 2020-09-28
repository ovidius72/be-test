import { t } from "@lingui/macro";
import { I18n, Trans } from "@lingui/react";
import moment from "moment-timezone";
import React, { FC, useEffect } from "react";
import { Grid, Header, Icon, Image, Label, Segment } from "semantic-ui-react";
import CenteredContainer from "src/components/layout/CenteredContainer";
import PageContainerWithHeader from "src/components/layout/PageContainerWithHeader";
import { fetchCityWeatherThunk } from "src/features/weather/weather.slice";
import { useAppDispatch, userAppSelector } from "src/store/store";
import { dateUtils } from "src/utils/date";

const DashboardPage: FC = () => {
  const { loading, data, error } = userAppSelector((s) => s.weather);
  console.log("data", data);
  const dispatch = useAppDispatch();

  const loadCityWeather = async () => {
    dispatch(fetchCityWeatherThunk({ cityName: "sulmona" }));
  };

  useEffect(() => {
    loadCityWeather();
  }, []);

  const w =
    data && data.cod === "200"
      ? data.list.map((l: any) => ({
          main: {
            temp: l.main.temp,
            pressure: l.main.pressure,
            humidity: l.main.humidity,
          },
          weather: l.weather.map((lw: any) => ({
            main: lw.main,
            description: lw.description,
            icon: lw.icon,
          })),
          clouds: l.clouds.all,
          wind: l.wind.speed,
          visibility: l.visibility,
        }))
      : undefined;
  console.log("w", w);
  return (
    <I18n>
      {({ i18n }) => (
        <PageContainerWithHeader
          headerAs="h2"
          loading={loading}
          headerText={i18n._(t`Dashboard`)}
        >
          <CenteredContainer error={!!error} errorMessage={error}>
            <Header as="h4" style={{ color: 'inherit' }}>
              <Trans>Previsioni meteo prossimi 5 giorni</Trans>
            </Header>
            <Label color="red">TODO: Add dropdown with cities</Label>

            <Grid padded columns={5} stackable>
              {w &&
                w.map((c: any, i: number) => {
                  const day = dateUtils.toShortDate(moment().add(i, "day"));
                  return (
                    <Grid.Column key={i}>
                      <Segment color="purple" inverted key={i}>
                        <Label>{day}</Label>
                        <Label circular color="grey">
                          {c.main.temp} C
                        </Label>
                        <div>
                          <Icon name="cloud" /> {c.clouds}
                        </div>
                        {c.weather.map((t: any, j: number) => (
                          <div key={j}>
                            <div>{t.description}</div>
                            <Image
                              src={`http://openweathermap.org/img/wn/${t.icon}@2x.png`}
                            />
                          </div>
                        ))}
                      </Segment>
                    </Grid.Column>
                  );
                })}
            </Grid>
          </CenteredContainer>
        </PageContainerWithHeader>
      )}
    </I18n>
  );
};

export default DashboardPage;
