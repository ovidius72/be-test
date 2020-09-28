import { t } from "@lingui/macro";
import { I18n, Trans } from "@lingui/react";
import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import {Icon, Table} from "semantic-ui-react";
import CenteredContainer from "src/components/layout/CenteredContainer";
import PageContainerWithHeader from "src/components/layout/PageContainerWithHeader";
import { loadOrderThunk } from "src/features/orders/orders.thunks";
import { useAppDispatch, userAppSelector } from "src/store/store";
import { dateUtils } from "src/utils/date";

const OrdersPage: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, error, loading } = userAppSelector((s) => s.orders);
  const erpId = userAppSelector((s) => s.login.user?.erpId);

  const loadUserOrders = async () => {
    if (erpId) {
      const orders = await dispatch(loadOrderThunk(erpId));
      console.log("orders", orders);
    }
  };

  useEffect(() => {
    loadUserOrders();
  }, [erpId]);
  return (
    <I18n>
      {({ i18n }) => (
        <PageContainerWithHeader
          headerAs="h2"
          loading={loading}
          headerText={i18n._(t`Orders`)}
          subHeaderText={i18n.t`Your orders`}
        >
          <CenteredContainer error={!!error} errorMessage={error}>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell><Trans>Order Number</Trans></Table.HeaderCell>
                  <Table.HeaderCell><Trans>Order Date</Trans></Table.HeaderCell>
                  <Table.HeaderCell><Trans>Shipped Date</Trans></Table.HeaderCell>
                  <Table.HeaderCell><Trans>Address</Trans></Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
              {orders.map(o => (
                <Table.Row key={`${o.order_id}`}>
                <Table.Cell><Icon name="angle double right" /><Link to={`/order-details/${o.order_id}`}>{o.order_id}</Link></Table.Cell>
                <Table.Cell>{dateUtils.toShortDate(o.order_date)}</Table.Cell>
                <Table.Cell>{dateUtils.toShortDate(o.shipped_date)}</Table.Cell>
                <Table.Cell>{o.ship_postal_code}, {o.ship_city} - {o.ship_address} - {o.ship_country}</Table.Cell>
                </Table.Row>
              ))}
              </Table.Body>
            </Table>
            
          </CenteredContainer>
        </PageContainerWithHeader>
      )}
    </I18n>
  );
};

export default OrdersPage;
