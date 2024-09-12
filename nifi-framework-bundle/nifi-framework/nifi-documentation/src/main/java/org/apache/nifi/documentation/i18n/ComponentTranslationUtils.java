package org.apache.nifi.documentation.i18n;

import java.io.File;

import org.apache.nifi.bundle.BundleCoordinate;
import org.apache.nifi.components.ConfigurableComponent;
import org.apache.nifi.controller.ControllerService;
import org.apache.nifi.nar.ExtensionDefinition;
import org.apache.nifi.nar.ExtensionManager;
import org.apache.nifi.processor.Processor;
import org.apache.nifi.reporting.ReportingTask;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ComponentTranslationUtils {

    private static final Logger logger = LoggerFactory.getLogger(ComponentTranslationUtils.class);
    public static final String DOCS_I18N_DIR = "./docs/i18n/";

    public static void translateConfigurableComponent(final ExtensionManager extensionManager,
            final ExtensionDefinition extensionDefinition, final BundleCoordinate bundleCoordinate) {
        final Class<?> extensionClass = extensionManager.getClass(extensionDefinition);
        final Class<? extends ConfigurableComponent> componentClass = extensionClass
                .asSubclass(ConfigurableComponent.class);

        final File i18nDir = new File(DOCS_I18N_DIR);
        final File componentFile = new File(i18nDir, componentClass.getCanonicalName() + ".json");
        if (componentFile.exists()) {
            // 翻译组件信息
            logger.info("Translate {}", componentClass.getName());
            try {
                ComponentTranslationIntf translator = getComponentTranslator(extensionManager, componentClass);
                translator.translate(componentClass, i18nDir, bundleCoordinate);
            } catch (Exception e) {
                logger.error("Failed to translate {}: {}", componentClass.getName(), e.getMessage());
            }
        } else {
            // 产生待翻译文件
            logger.info("Export {}", componentClass.getName());
            try {
                i18nDir.mkdirs();
                ComponentExporterIntf exporter = getComponentExporter(extensionManager, componentClass);
                exporter.export(componentClass, i18nDir, bundleCoordinate);
            } catch (Exception e) {
                logger.error("Failed to export {}: {}", componentClass.getName(), e.getMessage());
            }
        }
    }

    protected static ComponentTranslationIntf getComponentTranslator(final ExtensionManager extensionManager,
            final Class<? extends ConfigurableComponent> componentClass) {
        final String lang = "zh";

        if (Processor.class.isAssignableFrom(componentClass)) {
            return new ProcessorComponentTranslator(extensionManager, lang);
        } else if (ConfigurableComponent.class.isAssignableFrom(componentClass)) {
            return new ConfigurableComponentTranslator(extensionManager, lang);
        }

        return null;
    }

    protected static ComponentExporterIntf getComponentExporter(final ExtensionManager extensionManager,
            final Class<? extends ConfigurableComponent> componentClass) {
        final String[] langs = new String[] { "en", "zh" };

        if (Processor.class.isAssignableFrom(componentClass)) {
            return new ProcessorComponentExporter(extensionManager, langs);
        } else if (ConfigurableComponent.class.isAssignableFrom(componentClass)) {
            return new ConfigurableComponentExporter(extensionManager, langs);
        }

        return null;
    }
}
