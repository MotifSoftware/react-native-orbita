
package com.react_native_orbita;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class ONOrbitaModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public ONOrbitaModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "ONOrbita";
  }
}