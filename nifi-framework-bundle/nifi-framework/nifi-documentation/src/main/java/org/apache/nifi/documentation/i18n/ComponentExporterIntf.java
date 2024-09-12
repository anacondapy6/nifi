package org.apache.nifi.documentation.i18n;

import java.io.File;
import java.io.IOException;

import org.apache.nifi.bundle.BundleCoordinate;
import org.apache.nifi.components.ConfigurableComponent;

public interface ComponentExporterIntf {

    void export(final Class<? extends ConfigurableComponent> componentClass, final File i18nDir,
            final BundleCoordinate bundleCoordinate) throws IOException;
}
