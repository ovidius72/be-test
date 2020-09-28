import { t } from "@lingui/macro";
import { I18n } from "@lingui/react";
import React, { FC, useEffect } from "react";
import CenteredContainer from "src/components/layout/CenteredContainer";
import PageContainerWithHeader from "src/components/layout/PageContainerWithHeader";
import { loadOrderThunk } from "src/features/orders/orders.slice";
import { useAppDispatch, userAppSelector } from "src/store/store";
import {dateUtils} from "src/utils/date";

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
            <div>
              {orders.map((o) => (
                <div key={o.order_id}># {o.order_id} {i18n.t`date`}: {dateUtils.toShortDate(o.order_date)}</div>
              ))}
            </div>
          </CenteredContainer>
        </PageContainerWithHeader>
      )}
    </I18n>
  );
};

export default OrdersPage;
