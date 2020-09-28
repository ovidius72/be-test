import { I18n } from "@lingui/react";
import { t } from "@lingui/macro";
import React, { FC } from "react";
import CenteredContainer from "src/components/layout/CenteredContainer";
import PageContainerWithHeader from "src/components/layout/PageContainerWithHeader";

const DashboardPage: FC = () => {
  return (
    <I18n>
      {({ i18n }) => (
        <PageContainerWithHeader
          headerAs="h2"
          headerText={i18n._(t`Dashboard`)}
        >
          <CenteredContainer>
            <div>DASHBOARD</div>
          </CenteredContainer>
        </PageContainerWithHeader>
      )}
    </I18n>
  );
};

export default DashboardPage;
