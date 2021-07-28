Shopware.Component.register('sw-campaign-property-mapping', {

    render() {
        return this.$scopedSlots.default({
            mappedProperties: this.mappedProperties,
        });
    },

    props: {
        componentName: {
            type: String,
            required: true,
        },
    },

    computed: {
        currentLocale() {
            return Shopware.State.get('session').currentLocale;
        },

        mappedProperties() {
            const {
                component,
                campaignName,
            } = Shopware.State.getters['marketing/getActiveCampaignDataForComponent'](this.componentName);

            if (!component) {
                return null;
            }

            const propMapping = {
                // required properties
                campaignName: campaignName,
                headline: this.getTranslatedProp(component.content?.headline),
                mainAction: component?.content?.mainAction,
                inlineActions: component?.content?.description?.inlineActions,
                leftImage: this.getTranslatedProp(component?.leftImage?.src),
                componentName: this.componentName,
                // optional properties
                textColor: component?.content?.textColor,
                linkColor: component?.content?.linkColor,
                bgColor: component?.background?.color,
                bgImage: component?.background?.image,
                bgPosition: component?.background?.position,
                leftImageSourceSet: this.getTranslatedProp(component?.leftImage?.srcset),
                leftImageBgColor: component?.leftImage?.bgColor,
                labelText: this.getTranslatedProp(component?.content?.label?.text),
                labelTextColor: component?.content?.label?.textColor,
                labelBgColor: component?.content?.label?.bgColor,
                bannerIsClickable: component.content?.mainAction?.bannerIsClickable,
                alwaysShowLeftImage: !component?.leftImage?.hideInSmallViewports,
            };

            return propMapping;
        },
    },

    methods: {
        getTranslatedProp(translations) {
            if (!translations) {
                return undefined;
            }

            return translations[this.currentLocale] ?? translations['en-GB'];
        },
    },
});
