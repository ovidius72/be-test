import { t } from "@lingui/macro";
import { I18n, Trans } from "@lingui/react";
import React, { FC, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { Header, Icon, Segment, Table } from "semantic-ui-react";
import CenteredContainer from "src/components/layout/CenteredContainer";
import PageContainerWithHeader from "src/components/layout/PageContainerWithHeader";
import { fetchOrderDetails } from "src/features/orderDetails/orderDetails.slice";
import { useAppDispatch, userAppSelector } from "src/store/store";
import { dateUtils } from "src/utils/date";

const OrderDetailsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { orderDetails, error, loading } = userAppSelector(
    (s) => s.orderDetails
  );

  const loadOrderDetails = async () => {
    dispatch(fetchOrderDetails(id));
  };

  useEffect(() => {
    loadOrderDetails();
  }, [id]);

  const totalOrder = orderDetails.reduce(
    (acc, curr) => acc + (curr.unit_price * curr.quantity - curr.discount),
    0
  );
  const order = orderDetails.length > 0 ? orderDetails[0].order : undefined;
  return (
    <I18n>
      {({ i18n }) => (
        <PageContainerWithHeader
          headerAs=""
          loading={loading}
          headerText={i18n._(t`Order ${id}`)}
          subHeaderText={i18n.t`Order detail`}
        >
          <CenteredContainer
            onBack={history.goBack}
            error={!!error}
            errorMessage={error}
          >
            {order && (
              <Segment inverted size="tiny" placeholder>
                <Header icon>
                  <Icon name="user circle outline" />
                  <Trans>Order Date</Trans>:{" "}
                  {dateUtils.toShortDate(order.order_date)}
                </Header>
                <Segment.Inline>
                  <Trans>Shipped Address</Trans>:{ order.ship_postal_code} {order.ship_city},{" "}
                  {order.ship_address} - {order.ship_country}
                </Segment.Inline>
                <Segment.Inline>
                <Trans>Shipping date</Trans>: {dateUtils.toShortDate(order.shipped_date)}
                </Segment.Inline>
              </Segment>
            )}
            <Table celled striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <Trans>Product</Trans>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Trans>Quantuty</Trans>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Trans>Price</Trans>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Trans>Discount</Trans>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Trans>Total</Trans>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {orderDetails.map((d, i) => (
                  <Table.Row key={`${i}-${d.order_id}-${d.discount}`}>
                    <Table.Cell>
                      {d.product ? d.product.name : "N.A."}
                    </Table.Cell>
                    <Table.Cell>{d.quantity}</Table.Cell>
                    <Table.Cell>{d.unit_price}</Table.Cell>
                    <Table.Cell>{d.discount}</Table.Cell>
                    <Table.Cell negative>
                      {(d.quantity * d.unit_price - d.discount).toFixed(2)}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell colSpan="4" textAlign="right">
                    <Trans>Total</Trans>: {totalOrder.toFixed(2)}
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </CenteredContainer>
        </PageContainerWithHeader>
      )}
    </I18n>
  );
};

export default OrderDetailsPage;
