import { notification } from 'antd';

export const openNotificationWithIcon = (type, code) => {
    notification[type]({
        // message: translate("notify", { returnObjects: true })["title"],
        // description: translate("notify", { returnObjects: true })[code],
        description:code,
        placement: "bottomRight",
        duration: 2
    });
};