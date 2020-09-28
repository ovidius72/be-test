import React, { FC } from "react";
import {
  Header,
  Icon,
  Segment,
  SemanticICONS,
  Loader,
  Divider,
  SemanticCOLORS,
} from "semantic-ui-react";
import { IconSizeProp } from "semantic-ui-react/dist/commonjs/elements/Icon/Icon";
import PageHeader from "src/components/layout/Header";

type PageContainerWithHeaderProps = {
  headerText?: string;
  divider?: boolean;
  basic?: boolean;
  subHeaderText?: string;
  headerAs?: string;
  backgroungWorking?: boolean;
  backgrongWorkingText?: string;
  showBackgroundLoader?: boolean;
  iconColor?: SemanticCOLORS;
  textColor?: SemanticCOLORS;
  loading?: boolean;
  icon?: SemanticICONS;
  iconSize?: IconSizeProp;
  rightControl?: () => React.ReactElement;
};

const PageContainerWithHeader: FC<PageContainerWithHeaderProps> = ({
  loading,
  headerText,
  subHeaderText,
  icon,
  divider = true,
  iconColor,
  textColor,
  basic = true,
  headerAs = "h4",
  backgrongWorkingText = "",
  backgroungWorking = false,
  showBackgroundLoader = true,
  iconSize,
  rightControl,
  children,
}) => {
  return (
    <>
      <PageHeader title="Nortwhind Weather" />
      <Segment
        basic={basic}
        padded={false}
        style={{ minHeight: "100%", paddingTop: 10 }}
        loading={loading}
      >
        {headerText && (
          <Header floated="left" as={headerAs} color={textColor} style={{ color: 'inherit' }}>
            {icon && <Icon color={iconColor} name={icon} size={iconSize} />}
            <Header.Content>
              {headerText}
              {subHeaderText && (
                <Header.Subheader style={{ color: 'inherit' }}>{subHeaderText}</Header.Subheader>
              )}
            </Header.Content>
          </Header>
        )}

        <Header
          floated="right"
          as="h5"
          color="green"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {backgroungWorking && (
            <>
              {backgrongWorkingText && (
                <span style={{ marginRight: 4 }}>
                  {`${backgrongWorkingText}  `}{" "}
                </span>
              )}
              {showBackgroundLoader && <Loader active inline />}
            </>
          )}
          {rightControl && (
            <span style={{ marginLeft: 5 }}>{rightControl()}</span>
          )}
        </Header>

        {divider && <Divider clearing />}

        {children}
      </Segment>
    </>
  );
};

export default PageContainerWithHeader;
