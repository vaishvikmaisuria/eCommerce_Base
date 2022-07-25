import React from "react";
// not ready for production
function PayPalButton({ props }) {
    const [isSdkReady, setIsSdkReady] = useState(false);


    const {
        amount,
        onSuccess,
        createOrder,
        createSubscription,
        createBillingAgreement,
        onApprove,
        style,
        onShippingChange,
        onClick,
        onCancel,
    } = props;

    useEffect(() => {
        if (
            typeof window !== "undefined" &&
            window !== undefined &&
            window.paypal === undefined
        ) {
            addPaypalSdk();
        } else if (
            typeof window !== "undefined" &&
            window !== undefined &&
            window.paypal !== undefined &&
            this.props.onButtonReady
        ) {
            this.props.onButtonReady();
        }
    }, [dispatch, order, orderId, successPay]);

    const addPaypalSdk = (paymentResult) => {
        const { options, onButtonReady } = this.props;
        const queryParams = [];

        // replacing camelCase with dashes
        Object.keys(options).forEach((k) => {
            const name = k
                .split(/(?=[A-Z])/)
                .join("-")
                .toLowerCase();
            queryParams.push(`${name}=${options[k]}`);
        });

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?${queryParams.join("&")}`;
        script.async = true;
        script.onload = () => {
            this.setState({ isSdkReady: true });

            if (onButtonReady) {
                onButtonReady();
            }
        };
        script.onerror = () => {
            throw new Error("Paypal SDK could not be loaded.");
        };

        document.body.appendChild(script);
    };

    if (
        !isSdkReady &&
        (typeof window === "undefined" || window.paypal === undefined)
    ) {
        return null;
    }

    const Button = window.paypal.Buttons.driver("react", {
        React,
        ReactDOM,
    });

    const createOrderFn =
        amount && !createOrder
            ? (data, actions) => this.createOrder(data, actions)
            : (data, actions) => createOrder(data, actions);

    return (
        <Button
            {...this.props}
            createOrder={
                createSubscription || createBillingAgreement
                    ? undefined
                    : createOrderFn
            }
            createSubscription={createSubscription}
            createBillingAgreement={createBillingAgreement}
            onApprove={
                onSuccess
                    ? (data, actions) => this.onApprove(data, actions)
                    : (data, actions) => onApprove(data, actions)
            }
            style={style}
            onClick={onClick}
            onCancel={onCancel}
        />
    );
}
