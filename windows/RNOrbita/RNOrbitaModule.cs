using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Orbita.RNOrbita
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNOrbitaModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNOrbitaModule"/>.
        /// </summary>
        internal RNOrbitaModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNOrbita";
            }
        }
    }
}
