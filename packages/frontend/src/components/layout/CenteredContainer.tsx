import React, { FC } from "react";
import {
  Grid,
  Segment,
  Button,
  Icon,
  Message,
  Header,
} from "semantic-ui-react";

type CenteredContainerProps = {
  onBack?: () => void;
  headerText?: string;
  headerAs?: string;
  backText?: string;
  errorPosition?: "top" | "bottom";
  styles?: React.CSSProperties;
  /* loading?: boolean; */
  errorMessage?: string;
  onErrorDismiss?: () => void;
  error?: boolean;
  width?: 6 | 8 | 10 | 12 | 14 | 16;
};

const CenteredContainer: FC<CenteredContainerProps> = ({
  backText,
  onBack,
  error,
  styles,
  errorPosition = "bottom",
  headerText,
  headerAs = "h4",
  width = 16,
  onErrorDismiss,
  errorMessage,
  children,
}) => {
  const pad = (16 - width) / 2;

  return (
    <>
      {(headerText || onBack) && (
        <Grid className="grid-container" relaxed>
          <Grid.Row className="up-row" columns={1} styles={{ ...styles }}>
            <Grid.Column>
              <Segment basic clearing style={{ margin: 0, padding: 0 }}>
                {headerText && <Header style={{ color: 'inherit' }} as={headerAs}>{headerText}</Header>}
                {onBack && (
                  <Button as="a" icon onClick={onBack} floated="right">
                    <Icon name="chevron left" />
                    {backText || "Back"}
                  </Button>
                )}
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}

      <Grid stackable columns={3}>
        {pad > 0 && <Grid.Column width={pad as any} />}
        <Grid.Column width={width as any}>
          {errorPosition === "bottom" && children}
          {errorMessage && error && (
            <Message
              onDismiss={onErrorDismiss ? () => onErrorDismiss() : undefined}
              warning
            >
              {errorMessage}
            </Message>
          )}
          {errorPosition === "top" && children}
        </Grid.Column>
        {pad > 0 && <Grid.Column width={pad as any} />}
      </Grid>
    </>
  );
};
export default CenteredContainer;
